// ignore: import_of_legacy_library_into_null_safe
import 'dart:math';

import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:portfolio/utils/consts_uils.dart';

class AppBarContents extends StatefulWidget {
  final size, visibleMainHeight, animationVal;

  AppBarContents({key, this.size, this.visibleMainHeight, this.animationVal})
      : super(key: key);

  @override
  _AppBarContentsState createState() => _AppBarContentsState();
}

class _AppBarContentsState extends State<AppBarContents> {
  bool a = false, b = false, c = false;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: widget.size.width,
      height: widget.visibleMainHeight,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        mainAxisSize: MainAxisSize.max,
        children: [
          Expanded(
            child: Center(
              child: Wrap(
                alignment: WrapAlignment.spaceEvenly,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: <Widget>[
                  Padding(
                    padding: EdgeInsets.only(left: widget.animationVal),
                    child: CircleAvatar(
                      radius: widget.size.width > widget.visibleMainHeight
                          ? widget.visibleMainHeight / (pi / .6)
                          : widget.size.width / 3.5,
                      backgroundImage: const AssetImage('assets/my.jpg'),
                    ),
                  ),
                  widget.animationVal < 1
                      ? SizedBox(
                          width:
                              (widget.size.width / 100) / widget.animationVal)
                      : Container(
                          height: 1,
                          width: 1,
                          color: Colors.blue,
                        ),
                  SizedBox(
                    width: widget.size.width / 2,
                    child: Padding(
                      padding: const EdgeInsets.only(top: 25.0),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          AnimatedTextKit(
                            isRepeatingAnimation: false,
                            onFinished: () {
                              setState(() {
                                a = true;
                              });
                            },
                            animatedTexts: [
                              TyperAnimatedText(
                                "Hello\nI'm Sadakat Hussain",
                                textAlign: TextAlign.center,
                                textStyle: TextStyle(
                                    fontFamily: 'Kalam',
                                    fontSize: 30,
                                    color: Colors.black
                                        .withOpacity(widget.animationVal),
                                    fontWeight: FontWeight.w800),
                              ),
                            ],
                          ),
                          SizedBox(height: widget.size.height * .01),
                          a == false
                              ? Container()
                              : AnimatedTextKit(
                                  onFinished: () {
                                    setState(() {
                                      b = true;
                                    });
                                  },
                                  isRepeatingAnimation: false,
                                  animatedTexts: [
                                    TyperAnimatedText(
                                      "\"Thriving towards the exponential \"",
                                      textAlign: TextAlign.center,
                                      textStyle: TextStyle(
                                          fontSize: 22,
                                          fontStyle: FontStyle.italic,
                                          fontFamily: 'Bobbers',
                                          color: Colors.black
                                              .withOpacity(widget.animationVal),
                                          fontWeight: FontWeight.w400),
                                    ),
                                  ],
                                ),
                          SizedBox(height: widget.size.height * .03),
                          b == false
                              ? Container()
                              : SizedBox(
                                  width: widget.animationVal * 190,
                                  height: (widget.animationVal * 30),
                                  child: Wrap(
                                    children: <Widget>[
                                      _decBOx(
                                        AnimatedTextKit(
                                          isRepeatingAnimation: false,
                                          onFinished: () {
                                            setState(() {
                                              c = true;
                                            });
                                          },
                                          animatedTexts: [
                                            TyperAnimatedText(
                                              'I 💙 working with ',
                                              textAlign: TextAlign.center,
                                              textStyle: TextStyle(
                                                  fontFamily: 'Pacifico',
                                                  fontSize: 20.0,
                                                  fontStyle: FontStyle.italic,
                                                  fontWeight: FontWeight.w700),
                                            ),
                                          ],
                                        ),
                                      ),
                                      c == false
                                          ? Container()
                                          : _getAnimatedText()
                                    ],
                                  ),
                                ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Column(
            children: [
              Text(
                "Reach me through ...",
                textAlign: TextAlign.center,
                overflow: TextOverflow.clip,
                style: TextStyle(
                    fontFamily: 'Courgette',
                    fontSize: 23,
                    color: Colors.black.withOpacity(widget.animationVal),
                    fontWeight: FontWeight.w800),
              ),
              SizedBox(height: widget.size.height * .04),
              _socialContractWidgets(),
              SizedBox(
                height: 20,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Row _socialContractWidgets() {
    return Row(
      mainAxisSize: MainAxisSize.max,
      mainAxisAlignment: MainAxisAlignment.spaceAround,
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

DefaultTextStyle _getAnimatedText() {
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

DecoratedBox _decBOx(var a) {
  return DecoratedBox(
    position: DecorationPosition.foreground,
    decoration: BoxDecoration(
      gradient: LinearGradient(
        begin: Alignment.bottomCenter,
        end: Alignment.center,
        colors: <Color>[Colors.transparent, Colors.transparent],
      ),
    ),
    child: a,
  );
}
