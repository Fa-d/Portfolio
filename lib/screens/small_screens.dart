// ignore: import_of_legacy_library_into_null_safe
import 'package:blobs/blobs.dart';
import 'dart:math';

import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import '../consts_uils.dart';

Widget profileIconWidget(Size size, visibleMainHeight, animationVal) {
  return Positioned(
    top: animationVal,
    child: SizedBox(
      width: size.width,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        mainAxisSize: MainAxisSize.max,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            mainAxisSize: MainAxisSize.max,
            children: <Widget>[
              Expanded(
                flex: (animationVal * 100).toInt(),
                child: Container(),
              ),
              Padding(
                padding: const EdgeInsets.all(25.0),
                child: CircleAvatar(
                  radius: size.width > visibleMainHeight
                      ? visibleMainHeight / (pi / .6)
                      : size.width / 3.8,
                  backgroundImage: const AssetImage('assets/my.jpg'),
                ),
              ),
              Expanded(
                flex: 100,
                child: Container(),
              ),
            ],
          ),
        ],
      ),
    ),
  );
}

Widget profileNameDescWidget(Size size, animationVal) {
  return Positioned(
    top: size.height * .45,
    child: SizedBox(
      width: size.width,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            "Hello\nI'm Sadakat Hussain Fahad",
            textAlign: TextAlign.center,
            // overflow: OverflowBox.,
            style: TextStyle(
                fontSize: 30,
                color: Colors.black.withOpacity(animationVal),
                fontWeight: FontWeight.w800),
          ),
          _decBOx(const Text(
            '\nI love working with',
            style: TextStyle(
                fontSize: 20.0,
                fontStyle: FontStyle.italic,
                fontWeight: FontWeight.w700),
          )),
          SizedBox(
            width: size.width,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const SizedBox(width: 20.0, height: 100.0),
                DefaultTextStyle(
                  style: const TextStyle(
                    fontSize: 20.0,
                    fontFamily: 'Horizon',
                  ),
                  child: _decBOx(
                    AnimatedTextKit(
                      repeatForever: true,
                      animatedTexts: [
                        (RotateAnimatedText('Android')),
                        (RotateAnimatedText('Flutter')),
                        (RotateAnimatedText('Cloud  ')),
                      ],
                    ),
                  ),
                )
              ],
            ),
          ),
          Text(
            "Reach me through ...", textAlign: TextAlign.center,
            // overflow: OverflowBox.,
            style: TextStyle(
                fontSize: 23,
                color: Colors.black.withOpacity(animationVal),
                fontWeight: FontWeight.w800),
          )
        ],
      ),
    ),
  );
}

_decBOx(var a) {
  return DecoratedBox(
      position: DecorationPosition.foreground,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.bottomCenter,
          end: Alignment.center,
          colors: <Color>[Colors.transparent, Colors.transparent],
        ),
      ),
      child: a);
}

Widget profileContractsWidgets(Size size, visibleMainHeight, animationVal) {
  return Positioned(
    bottom: animationVal,
    child: Padding(
      padding: EdgeInsets.only(
          left: size.height / 20,
          right: size.height / 20,
          bottom: size.height / 30,
          top: size.height + 80),
      child: SizedBox(
        width: size.width * .9,
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          // crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(
              height: 35,
              width: 35,
              child: GestureDetector(
                onTap: () => launchURL(0),
                child: Image(image: AssetImage('assets/gmail.png')),
              ),
            ),
            SizedBox(
              height: 35,
              width: 35,
              child: GestureDetector(
                  onTap: () => launchURL(1),
                  child: Image(image: AssetImage('assets/linkedin.png'))),
            ),
            SizedBox(
              height: 35,
              width: 35,
              child: GestureDetector(
                  onTap: () => launchURL(2),
                  child: Image(image: AssetImage('assets/twitter.png'))),
            ),
            SizedBox(
              height: 35,
              width: 35,
              child: GestureDetector(
                  onTap: () => launchURL(3),
                  child: Image(image: AssetImage('assets/github.png'))),
            ),
            SizedBox(
              height: 35,
              width: 35,
              child: GestureDetector(
                  onTap: () => launchURL(4),
                  child: Image(image: AssetImage('assets/stack-overflow.png'))),
            ),
          ],
        ),
      ),
    ),
  );
}
