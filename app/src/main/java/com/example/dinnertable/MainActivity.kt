package com.example.dinnertable

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.ImageButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val clickMe = findViewById<Button>(R.id.clickMe)
        val account = findViewById<ImageButton>(R.id.account)
        val stats = findViewById<ImageButton>(R.id.stats)
        val settings = findViewById<ImageButton>(R.id.settings)


        clickMe.setOnClickListener {
            Toast.makeText(applicationContext, "Good Job!", Toast.LENGTH_SHORT).show()
        }

        account.setOnClickListener {
            val intent = Intent(this, AccountActivity::class.java)
            startActivity(intent)
            overridePendingTransition(0, 0)
        }

        stats.setOnClickListener {
            Toast.makeText(applicationContext, "Ga naar statistieken", Toast.LENGTH_SHORT).show()
        }
        settings.setOnClickListener {
            Toast.makeText(applicationContext, "Ga naar instellingen", Toast.LENGTH_SHORT).show()
        }
    }
}
