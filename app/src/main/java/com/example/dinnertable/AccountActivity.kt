package com.example.dinnertable

import android.content.Intent
import android.os.Bundle
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity

class AccountActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_account)

        val home = findViewById<ImageButton>(R.id.home)
//        val account = findViewById<ImageButton>(R.id.account)
//        val stats = findViewById<ImageButton>(R.id.stats)
//        val settings = findViewById<ImageButton>(R.id.settings)

        home.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
            overridePendingTransition(0, 0)
        }
    }
}