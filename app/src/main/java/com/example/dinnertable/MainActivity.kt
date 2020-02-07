package com.example.dinnertable

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
        val home = findViewById<ImageButton>(R.id.home)
        val account = findViewById<ImageButton>(R.id.account)
        val stats = findViewById<ImageButton>(R.id.stats)
        val settings = findViewById<ImageButton>(R.id.settings)


        clickMe.setOnClickListener {
            Toast.makeText(applicationContext, "Good Job!", Toast.LENGTH_SHORT).show()
        }

        home.setOnClickListener {
            Toast.makeText(applicationContext, "Ga naar home", Toast.LENGTH_SHORT).show()
        }
        account.setOnClickListener {
            Toast.makeText(applicationContext, "Ga naar account", Toast.LENGTH_SHORT).show()
        }
        stats.setOnClickListener {
            Toast.makeText(applicationContext, "Ga naar statistieken", Toast.LENGTH_SHORT).show()
        }
        settings.setOnClickListener {
            Toast.makeText(applicationContext, "Ga naar instellingen", Toast.LENGTH_SHORT).show()
        }

    }
}