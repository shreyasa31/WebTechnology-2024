package com.example.ebayshoppingapplictaion;

import android.os.Bundle;

import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.constraintlayout.widget.ConstraintSet;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.TextView;


public class SearchFragment extends Fragment {
    private CheckBox checkBox;
    private TextView textView,textView1;
    private EditText editText,editText2;
    private RadioGroup radioGroup;
    private Button dynamicButton,dynamicButton1;
    private ConstraintLayout constraintLayout;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_search, container, false);

        checkBox = view.findViewById(R.id.checkBox6);
        textView1 = view.findViewById(R.id.textDistance);
        textView = view.findViewById(R.id.textView9);
        editText = view.findViewById(R.id.zipcode);
        editText2=view.findViewById(R.id.distance);
        radioGroup = view.findViewById(R.id.radioGroup);
        textView.setVisibility(View.GONE);
        editText.setVisibility(View.GONE);
        editText2.setVisibility(View.GONE);
        radioGroup.setVisibility(View.GONE);
        textView1.setVisibility(View.GONE);
        dynamicButton = view.findViewById(R.id.button);
        dynamicButton1 = view.findViewById(R.id.button2);
        constraintLayout = view.findViewById(R.id.frameLayout);
        checkBox.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (checkBox.isChecked()) {
                    textView.setVisibility(View.VISIBLE);
                    editText.setVisibility(View.VISIBLE);
                    editText2.setVisibility(View.VISIBLE);
                    radioGroup.setVisibility(View.VISIBLE);
                    textView1.setVisibility(View.VISIBLE);
                    updateButtonConstraint(R.id.radioGroup);
                } else {
                    textView.setVisibility(View.GONE);
                    editText.setVisibility(View.GONE);
                    editText2.setVisibility(View.GONE);
                    radioGroup.setVisibility(View.GONE);
                    textView1.setVisibility(View.GONE);
                    updateButtonConstraint(R.id.checkBox6);
                }
            }
        });

        return view;
    }
    //
    private void updateButtonConstraint(int anchorId) {
        ConstraintSet constraintSet = new ConstraintSet();
        constraintSet.clone(constraintLayout);
        constraintSet.connect(R.id.button, ConstraintSet.TOP, anchorId, ConstraintSet.BOTTOM);
        constraintSet.connect(R.id.button2, ConstraintSet.TOP, anchorId, ConstraintSet.BOTTOM);
        constraintSet.applyTo(constraintLayout);
    }
}