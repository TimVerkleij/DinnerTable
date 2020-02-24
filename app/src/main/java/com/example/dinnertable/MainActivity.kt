package com.example.dinnertable

import android.content.Intent
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val account = findViewById<ImageButton>(R.id.account)
        val stats = findViewById<ImageButton>(R.id.stats)
        val settings = findViewById<ImageButton>(R.id.settings)

        //firebase variables
        var waarden = ""
        var gerechtenArray = mutableListOf("")
        gerechtenArray = gerechtenArray.drop(1).toMutableList()
        val database = FirebaseDatabase.getInstance()
        val myRef = database.reference


        val webView = findViewById<WebView>(R.id.webview)
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                view?.loadUrl(url)
                return true
            }
        }

        webView.settings.javaScriptEnabled = true
//        webView.settings.domStorageEnabled = true
        webView.loadUrl("file:///android_asset/index.html")

//        webView.loadUrl("https://www.google.com")


        //start connection to firebase

        myRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(dataSnapshot: DataSnapshot) {

                // This method is called once with the initial value and again
                // whenever data at this location is updated.

                // get the type
//               val value = dataSnapshot.getValue(String::class.java)

                waarden = dataSnapshot.child("gerechten").value.toString()

                //blokhaken weghalen uit de string
                for (value in waarden) {
                    if (value.toString() == "]") {

                        val lengte = waarden.length
                        waarden = waarden.removeRange(startIndex = lengte - 1, endIndex = lengte)
                    }
                }
                for (value in waarden) {
                    if (value.toString() == "[") {
                        waarden = waarden.removeRange(startIndex = 0, endIndex = 1)
                    }
                }

                println(waarden)
                webView.loadUrl("javascript:var waarden = \"${waarden}\"")
                webView.loadUrl("javascript:getFood()")
                /*

                myRef.removeEventListener(this)

                if (editText.text.toString() != "") {


                    val databaseInput = waarden + ", " + editText.text
                    val lijst = databaseInput.split(", ")
                    text.text = databaseInput

                    myRef.child("gerechten").setValue(databaseInput)

                    layout.removeAllViews()


                    for (value in lijst) {
                        val tvDynamic = TextView(this@MainActivity)

                        tvDynamic.textSize = 20f
                        tvDynamic.setPadding(80, 25, 0, 0)
                        tvDynamic.text = value

                        // add TextView to LinearLayout
                        layout.addView(tvDynamic)
                    }

                }else {
                    text.text = waarden
                    val lijst = waarden.split(", ")
                    for (value in lijst) {
                        val tvDynamic = TextView(this@MainActivity)

                        tvDynamic.textSize = 20f
                        tvDynamic.setPadding(80, 25, 0, 0)
                        tvDynamic.text = value

                        // add TextView to LinearLayout
                        layout.addView(tvDynamic)
                    }
                }


*/
            }

            override fun onCancelled(error: DatabaseError) {
                // Failed to read value
                Toast.makeText(applicationContext, "Geen verbinding", Toast.LENGTH_SHORT).show()
            }
        })



        account.setOnClickListener {
            val intent = Intent(this, AccountActivity::class.java)
            startActivity(intent)
            overridePendingTransition(0, 0)
        }

        stats.setOnClickListener {
            val intent = Intent(this, StatsActivity::class.java)
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
