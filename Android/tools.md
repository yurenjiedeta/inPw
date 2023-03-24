- tools属性，相当于预览

```xml
xmlns:tools="http://schemas.android.com/tools"

<TextView
 android:id="@+id/text_main"
 android:layout_width="match_parent"
 android:layout_height="wrap_content"
 android:textAppearance="@style/TextAppearance.Title"
 android:layout_margin="@dimen/main_margin"
 tools:text="I am a title" />
<!--- tools:text="I am a title" 不会被编译，编译的时候被忽略，只在界面的时候显示 --->

<ImageView
  android:layout_width="wrap_content"
  android:layout_height="wrap_content"
  android:layout_marginStart="@dimen/margin_main"
  android:layout_marginTop="@dimen/margin_main"
  android:scaleType="center"
  android:src="@drawable/divider"
  tools:ignore="contentDescription" />
<!--- tools:ignore="contentDescription" 会忽略报错或者警告 --->

<ripple xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:color="@color/accent_color"
  tools:targetApi="LOLLIPOP" />
<!--- tools:targetApi="LOLLIPOP" API警告的提示 --->

<resources
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  tools:locale="it">
  <!-- Your strings go here -->
</resources>
<!--- tools:locale="it" 国际化语言预览 --->

<LinearLayout
  xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:id="@+id/container"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical"
  tools:context="com.android.example.MainActivity">  <!-- ... -->
</LinearLayout>
<!--- tools:context="com.android.example.MainActivity" 用来设置 activity 的预览 --->

<!--- tools:menu="menu_main,menu_edit" 用来设置菜单的预览 --->

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:actionBarNavMode="tabs" />
<!--- tools:actionBarNavMode="tabs" 这个属性告诉ide  app bar（Material中对actionbar的称呼）的显示模式，可选值为：standard、tabs、list --->

<fragment xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/item_list"
    android:name="com.example.fragmenttwopanel.ItemListFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_marginLeft="16dp"
    android:layout_marginRight="16dp"
    tools:layout="@android:layout/list_content" />
<!--- tools:layout告诉ide，Fragment在程序预览的时候该显示成什么样 --->
```

