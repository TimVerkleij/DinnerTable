package com.example.dinnertable

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import kotlinx.android.synthetic.main.activity_account.*


class WebAppInterface(private val mContext: Context) {
    @JavascriptInterface
    fun getUserID(): String? {

        val auth: FirebaseAuth = FirebaseAuth.getInstance()
        val user: FirebaseUser? = auth.currentUser
        val userID: String?
        if (user != null) {
            userID = user.uid.toString()
        } else{
            userID = null
        }
        return userID
    }
}

class MainActivity : AppCompatActivity() {
lateinit var webView:WebView

    override fun onBackPressed() {
        super.onBackPressed()
        overridePendingTransition(0, 0)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val account = findViewById<ImageButton>(R.id.account)
        val stats = findViewById<ImageButton>(R.id.stats)
        val settings = findViewById<ImageButton>(R.id.settings)




        //firebase variables
//        var waarden = ""
//        var gerechtenArray = mutableListOf("")
//        gerechtenArray = gerechtenArray.drop(1).toMutableList()
//        val database = FirebaseDatabase.getInstance()
//        val myRef = database.reference


        val webView = findViewById<WebView>(R.id.webview)
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                view?.loadUrl(url)
                return true
            }
        }
//        webView.settings.domStorageEnabled = true
//        webView.loadUrl("file:///android_asset/WheelOfFortune/stw.html")
                webView.addJavascriptInterface(WebAppInterface(this), "Android")
        //        webView.loadUrl("https://www.google.com")




        webView.settings.javaScriptEnabled = true
        webView.loadUrl("file:///android_asset/index.html")
//        auth = FirebaseAuth.getInstance()
//        val user: FirebaseUser? = auth.currentUser
//        if (user != null) {
//            val userID = user.uid
//            webview.loadUrl(userID)
//          webView.loadUrl("javascript:console.log(\" $userID \" )") //print het google ID van de user (dit werkt)
//           webView.loadUrl("javascript:var userID = \" $userID \" ") //maakt een javascript variabel van het ID
//        }                                                       //userID is undefined wanneer het wordt aangeroepen
//                                                                //in javascript
//        webView.loadUrl("javascript:console.log(userID)")











//            val stringStuff = userID
//            val mything = "hello"
//            println(stringStuff)
//            Toast.makeText(getApplicationContext(), stringStuff, Toast. LENGTH_LONG).show();
//            webView.loadUrl("javascript:var userID = \"${mything}\"")
//            val myNumber = userID

//            webView.loadUrl("javascript:var theUserID =  \" $myNumber \" ")
//            webView.loadUrl("javascript:console.log(theUserID + 'heheheh')")
//            webView.addJavascriptInterface(userID, "idkman")
//            webView.loadUrl("javascript:pushMe()")


        //start connection to firebase
/*

        myRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                // get the type
//               val value = dataSnapshot.getValue(String::class.java)
                waarden = dataSnapshot.child("Gerechten").value.toString()

                println(waarden)
                webView.loadUrl("javascript:var waarden = \"${waarden}\"")
                webView.loadUrl("javascript:getFood()")
            }

            override fun onCancelled(error: DatabaseError) {
                // Failed to read value
                Toast.makeText(applicationContext, "Geen verbinding", Toast.LENGTH_SHORT).show()
            }
        })
*/




        account.setOnClickListener {
            val intent = Intent(this, AccountActivity::class.java)
            startActivity(intent)
//            finish()
            overridePendingTransition(0, 0)
        }

        stats.setOnClickListener {
            val intent = Intent(this, StatsActivity::class.java)
            startActivity(intent)
//            finish()
            overridePendingTransition(0, 0)
        }
        settings.setOnClickListener {
            val intent = Intent(this, SettingsActivity::class.java)
            startActivity(intent)
//            finish()
            overridePendingTransition(0, 0)
        }
    }
}

