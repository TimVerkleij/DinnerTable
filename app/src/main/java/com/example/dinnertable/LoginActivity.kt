package com.example.dinnertable

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.SignInButton
import com.google.android.gms.common.api.ApiException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.GoogleAuthProvider


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
                    }
            } else {
                println("niet alles is ingevuld")
            }
            } else {
                println("something went wrong...")
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

        signInButton.setOnClickListener {
            signIn()
        }

        //todo: important don't remove
//        signOutButton.setOnClickListener {
//            signOut()
//        }



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
                    val intent = Intent(this, MainActivity::class.java)
                    startActivity(intent)
                    finish()
                    overridePendingTransition(0, 0)
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
                updateUI(null)
            }
        }
    }
    private fun firebaseAuthWithGoogle(acct: GoogleSignInAccount) {
        Log.d(TAG, "firebaseAuthWithGoogle:" + acct.id!!)

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
                    updateUI(null)
                }

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
        if (user != null) {
            val webView = findViewById<WebView>(R.id.webview)

            signInButton.visibility = View.GONE

            if(user.isEmailVerified) {
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
                finish()
                overridePendingTransition(0, 0)
            } else {
                webView.loadUrl("file:///android_asset/inlogConfirm.html")
            }

        } else {

            signInButton.visibility = View.VISIBLE
        }
    }

    fun onClick(v: View) {
        when (v.id) {
            R.id.sign_in_button -> signIn()
        }
    }

    companion object {
        private const val TAG = "LoginActivity"
        private const val RC_SIGN_IN = 9001
    }





    }

