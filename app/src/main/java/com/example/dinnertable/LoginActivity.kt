package com.example.dinnertable

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.SignInButton
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.GoogleAuthProvider
import kotlinx.android.synthetic.main.activity_login.*
import org.xml.sax.ErrorHandler
import java.lang.Error

//import kotlinx.android.synthetic.main.activity_login.disconnectButton
//import kotlinx.android.synthetic.main.activity_login.main_layout
//import kotlinx.android.synthetic.main.activity_login.signInButton
//import kotlinx.android.synthetic.main.activity_login.signOutButton


class WebAppInterfaceLogin(private val mContext: Context) {
    @JavascriptInterface
    fun createUser(email: String?, password: String?, confirmPassword: String?): String? {
        val auth: FirebaseAuth = FirebaseAuth.getInstance()
        if (email != null && password != null && confirmPassword != null) {
            if (email.isNotEmpty() && password.isNotEmpty() && confirmPassword.isNotEmpty()) {
                if (password == confirmPassword) {
                    println("start logging in...")
                    println(email)
                    println(password)
                    println(confirmPassword)
                    println("done")
                    auth.createUserWithEmailAndPassword(email, password)
                        .addOnCompleteListener {
                            val user: FirebaseUser? = auth.currentUser
                            val userID: String?
                            if (user != null){
                                if (!user.isEmailVerified) {
                                    user.sendEmailVerification()
                                }
                            } else{
                                userID = null
                            }
                            println("finished")

                    }
                        .addOnFailureListener{
                            println("unable to create new account")
                        }


                } else{
                    println("wachtwoorden komen niet overeen")
                }


            } else{
                println("Niet alle velden zijn ingevuld")
            }
        }
        return email
    }

    @JavascriptInterface
    fun loginUser(email: String?, password: String?) {
        val auth: FirebaseAuth = FirebaseAuth.getInstance()
        var whatever: String? = "Complete"
        if (email != null && password != null) {
            if (email.isNotEmpty() && password.isNotEmpty()) {
                auth.signInWithEmailAndPassword(email, password)
                    .addOnCompleteListener() {
                        println("Done!")
                    }
                    .addOnFailureListener {
                        println("Authentication failed")
                        whatever = "AuthenticationFailed"
                    }
            } else {
                println("niet alles is ingevuld")
                whatever = "MissingCredentials"
            }
            } else {
                println("something went wrong...")
                whatever = "Unknown"
        }
        }
    }

open class LoginActivity : AppCompatActivity() {


    private lateinit var auth: FirebaseAuth

    private lateinit var googleSignInClient: GoogleSignInClient


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)


        val webView = findViewById<WebView>(R.id.webview)
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                view?.loadUrl(url)
                return true
            }
        }
        webView.addJavascriptInterface(WebAppInterfaceLogin(this), "Android")
        webView.settings.javaScriptEnabled = true
        webView.loadUrl("file:///android_asset/inlog.html")


        val signInButton = findViewById<SignInButton>(R.id.sign_in_button)
//        val signOutButton = findViewById<Button>(R.id.sign_out_button)
//        val disconnectButton = findViewById<Button>(R.id.button2)
//        val signOutAndDisconnect = findViewById<Button>(R.id.button3)

//        setProgressBar(R.id.progressBar)
        signInButton.setOnClickListener {
            signIn()
        }

        //todo: important don't remove
//        signOutButton.setOnClickListener {
//            signOut()
//        }


        // Button listeners
//        signInButton.setOnClickListener(this)
//        signOutButton.setOnClickListener(this)
//        disconnectButton.setOnClickListener(this)

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(getString(R.string.default_web_client_id))
            .requestEmail()
            .requestProfile()
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)

        auth = FirebaseAuth.getInstance()
        auth.addAuthStateListener {
        val currentUser = auth.currentUser
            if (currentUser != null) {
                println(currentUser.isEmailVerified)
                println(currentUser.isEmailVerified)
                println(currentUser.isEmailVerified)
//                if (currentUser.isEmailVerified) {
                    val intent = Intent(this, MainActivity::class.java)
                    startActivity(intent)
                    finish()
                    overridePendingTransition(0, 0)
//                } else {
//                    webView.loadUrl("file:///android_asset/inlogConfirm.html")
//                }
            }
        }

    }

    public override fun onStart() {
        super.onStart()
        // Check if user is signed in (non-null) and update UI accordingly.
        val currentUser = auth.currentUser
        updateUI(currentUser)
    }

    public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        // Result returned from launching the Intent from GoogleSignInApi.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)
            try {
                // Google Sign In was successful, authenticate with Firebase
                val account = task.getResult(ApiException::class.java)
                firebaseAuthWithGoogle(account!!)
            } catch (e: ApiException) {
                // Google Sign In failed, update UI appropriately
                Log.w(TAG, "Google sign in failed", e)
                // [START_EXCLUDE]
                updateUI(null)
                // [END_EXCLUDE]
            }
        }
    }
    private fun firebaseAuthWithGoogle(acct: GoogleSignInAccount) {
        Log.d(TAG, "firebaseAuthWithGoogle:" + acct.id!!)
        // [START_EXCLUDE silent]
//        showProgressBar()
        // [END_EXCLUDE]

        val credential = GoogleAuthProvider.getCredential(acct.idToken, null)
        auth.signInWithCredential(credential)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    // Sign in success, update UI with the signed-in user's information
                    Log.d(TAG, "signInWithCredential:success")
                    val user = auth.currentUser
                    updateUI(user)
                } else {
                    // If sign in fails, display a message to the user.
                    Log.w(TAG, "signInWithCredential:failure", task.exception)
//                    Snackbar.make(main_layout, "Authentication Failed.", Snackbar.LENGTH_SHORT).show()
                    updateUI(null)
                }

                // [START_EXCLUDE]
//                hideProgressBar()
                // [END_EXCLUDE]
            }
    }
    private fun signIn() {
        val signInIntent = googleSignInClient.signInIntent
        startActivityForResult(signInIntent, RC_SIGN_IN)
    }

    private fun signOut() {
        // Firebase sign out
        auth.signOut()

        // Google sign out
        googleSignInClient.signOut().addOnCompleteListener(this) {
            updateUI(null)
        }
    }

    private fun revokeAccess() {
        // Firebase sign out
        auth.signOut()

        // Google revoke access
        googleSignInClient.revokeAccess().addOnCompleteListener(this) {
            updateUI(null)
        }
    }

    private fun updateUI(user: FirebaseUser?) {
        val signInButton = findViewById<SignInButton>(R.id.sign_in_button)
//        val signOutButton = findViewById<Button>(R.id.sign_out_button)
//        val disconnectButton = findViewById<Button>(R.id.button2)
//        val signOutAndDisconnect = findViewById<Button>(R.id.button3)
        if (user != null) {
            val webView = findViewById<WebView>(R.id.webview)

            signInButton.visibility = View.GONE

            if(user.isEmailVerified) {
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
                finish()
                overridePendingTransition(0, 0)
            } else {
//                val task = user.reload()
//                task.addOnCompleteListener {
//                    println(user.isEmailVerified)
//                }
                webView.loadUrl("file:///android_asset/inlogConfirm.html")
            }
//            val intent = Intent(this, MainActivity::class.java)
//            startActivity(intent)
//            finish()
//            overridePendingTransition(0, 0)

        } else {

            signInButton.visibility = View.VISIBLE
//            signOutAndDisconnect.visibility = View.GONE
        }
    }

    fun onClick(v: View) {
        when (v.id) {
            R.id.sign_in_button -> signIn()
//            R.id.sign_out_button -> signOut()
//            R.id.button3 -> revokeAccess()

        }
    }

    companion object {
        private const val TAG = "LoginActivity"
        private const val RC_SIGN_IN = 9001
    }





    }

