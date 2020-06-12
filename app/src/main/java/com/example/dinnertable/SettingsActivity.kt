package com.example.dinnertable

import android.app.*
import android.app.Notification.Builder
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.ImageButton
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.graphics.green
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser


class WebAppInterfaceSettings(private val mContext: Context) {
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
    @JavascriptInterface
    fun userLogOut(){
        val auth: FirebaseAuth = FirebaseAuth.getInstance()
        auth.signOut()
    }
    }



class SettingsActivity : AppCompatActivity() {

    private lateinit var auth: FirebaseAuth

    private lateinit var googleSignInClient: GoogleSignInClient

    override fun onBackPressed() {
        super.onBackPressed()
        overridePendingTransition(0, 0)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        val home = findViewById<ImageButton>(R.id.home)
        val account = findViewById<ImageButton>(R.id.account)
        val stats = findViewById<ImageButton>(R.id.stats)


        val webView = findViewById<WebView>(R.id.webview)
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                view?.loadUrl(url)
                return true
            }
        }

        webView.addJavascriptInterface(WebAppInterfaceSettings(this), "Android")
        webView.settings.javaScriptEnabled = true
        webView.loadUrl("file:///android_asset/settings.html")

        auth = FirebaseAuth.getInstance()

        auth.addAuthStateListener {
            val currentUser = auth.currentUser
            if (currentUser == null) {
                val intent = Intent(this, LoginActivity::class.java)
                startActivity(intent)
                finish()
                overridePendingTransition(0, 0)
                }
            }



        createNotificationChannel()



        home.setOnClickListener {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
//            finish()
            overridePendingTransition(0, 0)
        }

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









    }


    companion object {
        private const val NOTIFICATION_ID = 112
        private const val PRIMARY_CHANNEL_ID = "primary_notification_channel"
    }

    private lateinit var notificationManager: NotificationManager

    private fun createNotificationChannel() {
        notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                PRIMARY_CHANNEL_ID,
                "Messages",
                NotificationManager.IMPORTANCE_HIGH
            )

            channel.enableLights(true)
            channel.lightColor = Color.RED
            channel.enableVibration(true)
            channel.description = "Messages Notification"
            notificationManager.createNotificationChannel(channel)

            val intent = Intent(this, MainActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            }

            val pendingIntent: PendingIntent = PendingIntent.getActivity(this, 0, intent, 0)

            // creating the notification and its parameters.
            val builder = NotificationCompat.Builder(this, PRIMARY_CHANNEL_ID).apply {
                setSmallIcon(R.drawable.new_dinnertable_logo)
                setContentIntent(pendingIntent)
                setContentTitle("DinnerTable")
                setContentText("Wat eet je vandaag?")
                setAutoCancel(true)
                setPriority(NotificationCompat.PRIORITY_DEFAULT)
            }

// displaying the notification with NotificationManagerCompat.
            with(NotificationManagerCompat.from(this)) {
                notify(NOTIFICATION_ID, builder.build())
            }

/* or you can use the notification manager object.
notificationManager.notify(NOTIFICATION_ID, notification.build())
*/
        }
    }

    private fun createAlarm(){
//
    }



}




