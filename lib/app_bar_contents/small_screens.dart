// ignore: import_of_legacy_library_into_null_safe
import 'dart:math';

import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:portfolio/utils/consts_uils.dart';

class AppBarContents extends StatelessWidget {
  final size, visibleMainHeight, animationVal;

  AppBarContents({key, this.size, this.visibleMainHeight, this.animationVal})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size.width,
      height: size.height,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        mainAxisSize: MainAxisSize.max,
        children: [
          Wrap(
            alignment: WrapAlignment.spaceEvenly,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.only(left: animationVal),
                child: CircleAvatar(
                  radius: size.width > visibleMainHeight
                      ? visibleMainHeight / (pi / .6)
                      : size.width / 3.5,
                  backgroundImage: const AssetImage('assets/my.jpg'),
                ),
              ),
              animationVal < 1
                  ? SizedBox(width: (size.width / 100) / animationVal)
                  : Container(
                      height: 1,
                      width: 1,
                      color: Colors.blue,
                    ),
              SizedBox(
                width: size.width / 2,
                child: Padding(
                  padding: const EdgeInsets.only(top: 25.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Text(
                        "Hello\nI'm Sadakat Hussain",
                        textAlign: TextAlign.center,
                        // overflow: OverflowBox.,
                        style: TextStyle(
                            fontSize: 30,
                            color: Colors.black.withOpacity(animationVal),
                            fontWeight: FontWeight.w800),
                      ),
                      SizedBox(height: size.height * .05),
                      SizedBox(
                        width: animationVal * 190,
                        height: (animationVal * 30),
                        child: Wrap(
                          children: <Widget>[
                            _decBOx(
                              const Text(
                                'I love working with ',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    fontSize: 20.0,
                                    fontStyle: FontStyle.italic,
                                    fontWeight: FontWeight.w700),
                              ),
                            ),
                            getAnimatedText()
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          Column(
            children: [
              Text(
                "Reach me through ...",
                textAlign: TextAlign.center,
                overflow: TextOverflow.clip,
                style: TextStyle(
                    fontSize: 23,
                    color: Colors.black.withOpacity(animationVal),
                    fontWeight: FontWeight.w800),
              ),
              SizedBox(height: size.height * .04),
              socialContractWidgets(),
              SizedBox(
                height: 20,
              ),
            ],
          )
        ],
      ),
    );
  }

  Row socialContractWidgets() {
    return Row(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      // crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(
          height: 20,
          width: 10,
        ),
        SizedBox(
          height: 20,
          width: 10,
        ),
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
        SizedBox(
          height: 20,
          width: 10,
        ),
        SizedBox(
          height: 20,
          width: 10,
        ),
      ],
    );
  }
}

DefaultTextStyle getAnimatedText() {
  return DefaultTextStyle(
    style: const TextStyle(
      fontSize: 20.0,
      color: Colors.blueAccent,
      fontWeight: FontWeight.bold,
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
