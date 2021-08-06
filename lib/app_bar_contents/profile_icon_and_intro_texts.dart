import 'dart:math';

import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';

class ProfileIconTexts extends StatefulWidget {
  var animationVal;

  var visibleMainHeight, size;

  ProfileIconTexts(this.size, this.animationVal, this.visibleMainHeight,
      {Key? key})
      : super(key: key);

  @override
  _ProfileIconTextsState createState() => _ProfileIconTextsState();
}

class _ProfileIconTextsState extends State<ProfileIconTexts> {

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Wrap(
        alignment: WrapAlignment.spaceAround,
         crossAxisAlignment: WrapCrossAlignment.center,
        children: <Widget>[
          // Padding(
          //   padding: EdgeInsets.only(
          //       left: (widget.size.width / 100) / widget.animationVal),
          //   child:
            CircleAvatar(
              radius: widget.size.width > widget.visibleMainHeight
                  ? widget.visibleMainHeight / (pi / .6)
                  : widget.size.width / 3.5,
              backgroundImage: const AssetImage('assets/my.jpg'),
            ),
          // ),
          widget.animationVal < 1
              ? SizedBox(width: (widget.size.width / 100) / widget.animationVal)
              : Container(
                  height: 1,
                  width: 1,
                  color: Colors.blue,
                ),
          SizedBox(
            width: widget.size.width / 2 * 1.5,
            child: Padding(
              padding: const EdgeInsets.only(top: 1.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Text(
                    "Hello\nI'm Sadakat Hussain",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontFamily: 'Kalam',
                        fontSize: 30,
                        color: Colors.black.withOpacity(widget.animationVal),
                        fontWeight: FontWeight.w800),
                  ),
                  SizedBox(height: widget.size.height * .01),
                  AnimatedTextKit(
                    isRepeatingAnimation: false,
                    animatedTexts: [
                      TyperAnimatedText(
                        "\"Thriving towards the exponential \"",
                        textAlign: TextAlign.center,
                        textStyle: TextStyle(
                            fontSize: 22,
                            fontStyle: FontStyle.italic,
                            fontFamily: 'Bobbers',
                            color:
                                Colors.black.withOpacity(widget.animationVal),
                            fontWeight: FontWeight.w400),
                      ),
                    ],
                  ),
                  SizedBox(height: widget.size.height * .03),
                  SizedBox(
                    width: widget.animationVal * 190,
                    height: (widget.animationVal * 30),
                    child: Wrap(
                      children: <Widget>[
                        _decBOx(
                          Text(
                            'I 💙 working with ',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                                fontFamily: 'Pacifico',
                                fontSize: 20.0,
                                fontStyle: FontStyle.italic,
                                fontWeight: FontWeight.w700),
                          ),
                        ),
                        _getAnimatedText()
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
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
          (RotateAnimatedText('BackEnd')),
          (RotateAnimatedText('ML  ')),
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
