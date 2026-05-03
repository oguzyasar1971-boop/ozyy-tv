package com.example.ozyytvplayer

import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView

class PlayerActivity : ComponentActivity() {

    private lateinit var player: ExoPlayer

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val playerView = PlayerView(this)
        player = ExoPlayer.Builder(this).build()

        playerView.player = player

        val url = intent.getStringExtra("url")

        if (url != null) {
            val mediaItem = MediaItem.fromUri(Uri.parse(url))
            player.setMediaItem(mediaItem)
            player.prepare()
            player.play()
        }

        setContentView(playerView)
    }

    override fun onDestroy() {
        super.onDestroy()
        player.release()
    }
}
