package com.example.dinnertable

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintSet
import androidx.recyclerview.widget.DividerItemDecoration
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import kotlinx.android.synthetic.main.activity_account.*


class WebAppInterfaceAccount(private val mContext: Context) {
    @JavascriptInterface
    fun getUserID(): String? {

        val auth: FirebaseAuth = FirebaseAuth.getInstance()
        val user: FirebaseUser? = auth.currentUser
        val userID: String?
//        val userPhoto: String?
//        val userEmail: String?
//        val userName: String?
        userID = if (user != null) {
            user.uid
            //            userPhoto = user.photoUrl.toString()
            //            userName = user.displayName
            //            userEmail = user.email
        } else {
            null
            //            userPhoto = null
            //            userEmail = null
            //            userName = null
        }
        return userID
    }

    @JavascriptInterface
    fun getUserName(): String? {
        val auth: FirebaseAuth = FirebaseAuth.getInstance()
        val user: FirebaseUser? = auth.currentUser
        val userName: String?
        userName = if (user != null) {
            user.displayName
        } else {
            null
        }
        return userName
    }

    @JavascriptInterface
    fun getUserEmail(): String? {
        val auth: FirebaseAuth = FirebaseAuth.getInstance()
        val user: FirebaseUser? = auth.currentUser
        val userEmail: String?
        userEmail = if (user != null) {
            user.email
        } else {
            null
        }
        return userEmail
    }

    @JavascriptInterface
    fun getUserPhoto(): String? {
        val auth: FirebaseAuth = FirebaseAuth.getInstance()
        val user: FirebaseUser? = auth.currentUser
        val userPhoto: String?
        userPhoto = if (user != null) {
            user.photoUrl.toString()
        } else {
            null
        }
        return userPhoto
    }
}

class AccountActivity : AppCompatActivity() {

    override fun onBackPressed() {
        super.onBackPressed()
        overridePendingTransition(0, 0)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_account)

        val home = findViewById<ImageButton>(R.id.home)
//        val account = findViewById<ImageButton>(R.id.account)
        val stats = findViewById<ImageButton>(R.id.stats)
        val settings = findViewById<ImageButton>(R.id.settings)




        val webView = findViewById<WebView>(R.id.webview)
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                view?.loadUrl(url)
                return true
            }
        }

        webView.addJavascriptInterface(WebAppInterfaceAccount(this), "Android")
        webView.settings.javaScriptEnabled = true
        webView.loadUrl("file:///android_asset/account.html")


        home.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
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