- gulp替换的小例子

```js
gulp.task('replaceLess', () => {
    return gulp.src(['init/**'])//重点
     .pipe(replace(/grid-em-section/g, conf.modular_class))
     .pipe(replace(/EM-/g, `${conf.action_class}`))
     .pipe(replace(/em-ui-/g, `${conf.ui_class}`))
     .pipe(replace(/em-event-/g, `${conf.tag_class}`))
     // .pipe(replace(/em-/g, `${conf.tag_class}`))
     .pipe(gulp.dest("test/init/"));//重点
})
```

