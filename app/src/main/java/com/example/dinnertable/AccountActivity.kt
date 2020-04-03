package com.example.dinnertable

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintSet
import androidx.recyclerview.widget.DividerItemDecoration
import com.google.android.material.bottomnavigation.BottomNavigationView
import kotlinx.android.synthetic.main.activity_account.*

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