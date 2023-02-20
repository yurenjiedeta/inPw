- ConstraintLayout

```tex
1、ConstraintLayout 在设计的时候考虑了拖放式 GUI 构建；
2、ConstraintLayout 会一直考虑性能问题，相比 RelativeLayout 等；
3、ConstraintLayout 会使用完整的类名来进行使用在 xml 中，如： <androidx.constraintlayout.widget.ConstraintLayout>
4、ConstraintLayout 布局使用 app:xxx 来做属性使用，这是由库代码决定的 xml 属性(外面额外定义)；
```

- 添加`ConstraintLayou`库

```properties
dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation 'androidx.appcompat:appcompat:1.3.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.1'
    implementation "androidx.activity:activity:1.3.1"
}

```

- ConstraintLayoutRow示例

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:padding="@dimen/container_padding">

  <TextView android:id="@+id/label"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/label_caption"
    app:layout_constraintBaseline_toBaselineOf="@id/button"
    app:layout_constraintStart_toStartOf="parent" />

  <Button
    android:id="@+id/button"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:text="@string/button_caption"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintStart_toEndOf="@id/label"
    app:layout_constraintEnd_toEndOf="parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>

<!--- ConstraintLayout 的宽高属性都是 match_parent：代表着此⼩部件或容器应填
充其父容器的可用空间。在此情况下，“父级”是一个占据屏幕大部分空间的容器,因此，ConstraintLayout 将填充该空间。 --->
<!--- ConstraintLayout 的 android:padding 属性：它设置了 padding 值为 @dimen/container_padding 的值，但是它是占据了整个屏幕的 --->

<!--- 对于 TextView 和 Button 的说明，他们都设置了 ID、size、captions(android:text) --->

<!--- TextView 的 app:layout_constraintStartOf="parents" 属性的意思：
·  对于 LTR 或者 RTL 来说 ，上面的属性意思就是把 组件放置于顶部 Layout（ConstraintLayout） 的开始位置
--->
<!--- TextView 的 app:layout_constraintBaseline_toBaselineOf="@id/button"
 相当于一条基线用来对其吧
--->

<!--- Button 的 app:layout_constraintTop_toTopOf="parent" 意思是放置在 ConstraintLayout的顶部 --->
<!--- Button 的 app:layout_constraintTop_toEndOf="parent" 意思是放置在 ConstraintLayout的尾部，尾部对于 LTR 来说就是 右边，RTL 的来说就是 左边 --->
<!--- Button 的 app:layout_constraintStart_toEndOf="@id/label" 意思是 Button 在 TextView 的结束位置进行开始 --->


<!--- 此外，ConstraintLayout 布局 还可以在 安卓 的图形布局编辑器进行编辑 --->
<!--- page 205 --->
```

