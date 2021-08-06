// ignore: import_of_legacy_library_into_null_safe

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:portfolio/app_bar_contents/contracts.dart';

import 'profile_icon_and_intro_texts.dart';

class AppBarContents extends StatefulWidget {
  final size, visibleMainHeight, animationVal;

  AppBarContents({key, this.size, this.visibleMainHeight, this.animationVal})
      : super(key: key);

  @override
  _AppBarContentsState createState() => _AppBarContentsState();
}

class _AppBarContentsState extends State<AppBarContents> {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size.width,
      height: widget.visibleMainHeight,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        mainAxisSize: MainAxisSize.max,
        children: [
          widget.visibleMainHeight >= widget.size.height * .350
              ? ProfileIconTexts(
                  widget.size,
                  widget.animationVal,
                  widget.visibleMainHeight,
                )
              : Container(),
          SizedBox(
            height: 40,
          ),
          widget.visibleMainHeight >= widget.size.height * .70
              ? Contracts(
                  widget.animationVal,
                  widget.size,
                  widget.visibleMainHeight,
                )
              : Container(),
        ],
      ),
    );
  }
}
