package com.example.ebayshoppingapplictaion;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.os.Bundle;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;

public class DetailActivity extends AppCompatActivity {
    private TextView toolbarTitle;
    private ImageView toolbarImage;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
//        Toolbar toolbar = findViewById(R.id.toolbar);
//        setSupportActionBar(toolbar);
//
//        // Enable the Up button
//        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
//
//        // Get the title passed from the ProductResults activity
//        String productTitle = getIntent().getStringExtra("title");
//        getSupportActionBar().setTitle(productTitle); // Set the title
//    }
//
//    // Handle the Up button
//    @Override
//    public boolean onOptionsItemSelected(MenuItem item) {
//        if (item.getItemId() == android.R.id.home) {
//            finish();
//            return true;
//        }
//        return super.onOptionsItemSelected(item);
//    }
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // Enable the Up button
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        // Find the TextView and ImageView
        toolbarTitle = findViewById(R.id.toolbarTitle);
        toolbarImage = findViewById(R.id.toolbarImage);

        // Hide the default title to use the custom one
        getSupportActionBar().setDisplayShowTitleEnabled(false);

        // Set the title and image
        String productTitle = getIntent().getStringExtra("title");
        toolbarTitle.setText(productTitle); // Set the custom title
        // Set the image resource for the ImageView if needed
        // toolbarImage.setImageResource(R.drawable.your_image_resource);
    }

    // Handle the Up button
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}