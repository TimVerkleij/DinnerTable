package com.example.dinnertable

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser


class WebAppInterfaceStats(private val mContext: Context) {
    @JavascriptInterface
    fun getUserID(): String? {
        val auth: FirebaseAuth = FirebaseAuth.getInstance()
        val user: FirebaseUser? = auth.currentUser
        val userID: String?
        if (user != null) {
            userID = user.uid.toString()
        } else {
            userID = null
        }
        return userID
    }
}



class StatsActivity : AppCompatActivity() {

    override fun onBackPressed() {
        super.onBackPressed()
        overridePendingTransition(0, 0)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_stats)

        val home = findViewById<ImageButton>(R.id.home)
        val account = findViewById<ImageButton>(R.id.account)
        val settings = findViewById<ImageButton>(R.id.settings)


        val webView = findViewById<WebView>(R.id.webview)
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                view?.loadUrl(url)
                return true
            }
        }

        webView.settings.javaScriptEnabled = true
        webView.addJavascriptInterface(WebAppInterfaceStats(this), "Android")
        webView.loadUrl("file:///android_asset/statistieken.html")

        home.setOnClickListener{
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            overridePendingTransition(0, 0)
        }

        account.setOnClickListener {
            val intent = Intent(this, AccountActivity::class.java)
            startActivity(intent)
            overridePendingTransition(0, 0)
        }

        settings.setOnClickListener {
            val intent = Intent(this, SettingsActivity::class.java)
            startActivity(intent)
            overridePendingTransition(0, 0)
        }
    }
}