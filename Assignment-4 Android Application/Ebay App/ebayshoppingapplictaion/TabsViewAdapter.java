package com.example.ebayshoppingapplictaion;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;
import androidx.viewpager2.adapter.FragmentStateAdapter;

public class TabsViewAdapter extends FragmentStateAdapter {
    private  String itemId;
    private String keyword;
    private String ShippingType;
//    private OnContentLoadedListener contentLoadedListener;

//    public interface OnContentLoadedListener {
//        void onContentLoaded();
//    }

    public TabsViewAdapter(FragmentActivity fa,String keyword,String itemId,String SHippingType) {
        super(fa);
        this.keyword = keyword;
        this.itemId=itemId;
        this.ShippingType=SHippingType;
//        this.contentLoadedListener = listener;

    }

    @Override
    public Fragment createFragment(int position) {
        switch (position) {
            case 0:
                return ProductFragment.newInstance(itemId,ShippingType);
//            case 0:
//                Fragment productFragment = ProductFragment.newInstance(itemId, ShippingType);
//                if (contentLoadedListener != null) {
//                    contentLoadedListener.onContentLoaded(); // Call the callback when the first fragment is loaded
//                }
//                return productFragment;
            case 1:
                return ShippingFragment.newInstance(itemId,ShippingType);
            case 2:
//                return new PhotosFragment();
                return PhotosFragment.newInstance(keyword);
            case 3:
//                return new SimilarFragment();
                return SimilarFragment.newInstance(itemId);
            default:
                return new ProductFragment();
        }
    }

    @Override
    public int getItemCount() {
        return 4; // Number of tabs
    }
}
