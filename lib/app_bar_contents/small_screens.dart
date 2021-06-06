// ignore: import_of_legacy_library_into_null_safe
import 'dart:math';

import 'package:animated_text_kit/animated_text_kit.dart';
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
                child: GestureDetector(
                  // key: key,
                  onTap: () {
                    Scaffold.of(context).openDrawer();
                  },
                  child: CircleAvatar(
                    radius: size.width > visibleMainHeight
                        ? visibleMainHeight / (pi / .6)
                        : size.width / 3.8,
                    backgroundImage: const AssetImage('assets/my.jpg'),
                  ),
                ),
              ),
              Expanded(
                flex: 100,
                child: Container(),
              ),
            ],
          ),
          Text(
            "Hello\nI'm Sadakat Hussain Fahad",
            textAlign: TextAlign.center,
            // overflow: OverflowBox.,
            style: TextStyle(
                fontSize: 30,
                color: Colors.black.withOpacity(animationVal),
                fontWeight: FontWeight.w800),
          ),
          SizedBox(height: size.height * .01),
          Center(
            child: SizedBox(
              width: size.width,
              height: size.height * .1,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  SizedBox(
                    width: size.width / 3,
                  ),
                  _decBOx(
                    const Text(
                      'I love working with ',
                      style: TextStyle(
                          fontSize: 20.0,
                          fontStyle: FontStyle.italic,
                          fontWeight: FontWeight.w700),
                    ),
                  ),
                  const SizedBox(width: 20.0, height: 100.0),
                  getAnimatedText()
                ],
              ),
            ),
          ),
          Text(
            "Reach me through ...",
            textAlign: TextAlign.center,
            overflow: TextOverflow.clip,
            style: TextStyle(
                fontSize: 23,
                color: Colors.black.withOpacity(animationVal),
                fontWeight: FontWeight.w800),
          ),
          SizedBox(height: size.height * .02),
          Row(
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
                    child:
                        Image(image: AssetImage('assets/stack-overflow.png'))),
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
          ),
          SizedBox(
            height: 20,
          )
        ],
      ),
    );
  }
}

// Widget appbarContents(Size size, visibleMainHeight, animationVal, _scaffoldKey) {
//   return SizedBox(
//     width: size.width,
//     child: Column(
//       mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//       mainAxisSize: MainAxisSize.max,
//       children: [
//         Row(
//           mainAxisAlignment: MainAxisAlignment.spaceEvenly,
//           mainAxisSize: MainAxisSize.max,
//           children: <Widget>[
//             Expanded(
//               flex: (animationVal * 100).toInt(),
//               child: Container(),
//             ),
//             Padding(
//               padding: const EdgeInsets.all(25.0),
//               child: GestureDetector(
//                 onTap: (){
//                   _scaffoldKey.currentState.openDrawer();
//                 },
//                 child: CircleAvatar(
//                   radius: size.width > visibleMainHeight
//                       ? visibleMainHeight / (pi / .6)
//                       : size.width / 3.8,
//                   backgroundImage: const AssetImage('assets/my.jpg'),
//                 ),
//               ),
//             ),
//             Expanded(
//               flex: 100,
//               child: Container(),
//             ),
//           ],
//         ),
//         Text(
//           "Hello\nI'm Sadakat Hussain Fahad",
//           textAlign: TextAlign.center,
//           // overflow: OverflowBox.,
//           style: TextStyle(
//               fontSize: 30,
//               color: Colors.black.withOpacity(animationVal),
//               fontWeight: FontWeight.w800),
//         ),
//         SizedBox(height: size.height * .01),
//         SizedBox(
//           width: size.width,
//           height: size.height * .1,
//           child: Row(
//             mainAxisSize: MainAxisSize.min,
//             mainAxisAlignment: MainAxisAlignment.start,
//             children: <Widget>[
//               SizedBox(width: size.width/3,),
//               _decBOx(
//                 const Text(
//                   'I love working with \t',
//                   style: TextStyle(
//                       fontSize: 20.0,
//                       fontStyle: FontStyle.italic,
//                       fontWeight: FontWeight.w700),
//                 ),
//               ),
//               // const SizedBox(width: 20.0, height: 100.0),
//               getAnimatedText()
//             ],
//           ),
//         ),
//         Text(
//           "Reach me through ...", textAlign: TextAlign.center,
//           overflow: TextOverflow.clip,
//           style: TextStyle(
//               fontSize: 23,
//               color: Colors.black.withOpacity(animationVal),
//               fontWeight: FontWeight.w800),
//         ),
//         SizedBox(height: size.height * .02),
//         Row(
//           mainAxisSize: MainAxisSize.max,
//           mainAxisAlignment: MainAxisAlignment.spaceAround,
//           // crossAxisAlignment: CrossAxisAlignment.center,
//           children: [
//             SizedBox(
//               height: 20,
//               width: 10,
//             ),
//             SizedBox(
//               height: 20,
//               width: 10,
//             ),
//             SizedBox(
//               height: 35,
//               width: 35,
//               child: GestureDetector(
//                 onTap: () => launchURL(0),
//                 child: Image(image: AssetImage('assets/gmail.png')),
//               ),
//             ),
//             SizedBox(
//               height: 35,
//               width: 35,
//               child: GestureDetector(
//                   onTap: () => launchURL(1),
//                   child: Image(image: AssetImage('assets/linkedin.png'))),
//             ),
//             SizedBox(
//               height: 35,
//               width: 35,
//               child: GestureDetector(
//                   onTap: () => launchURL(2),
//                   child: Image(image: AssetImage('assets/twitter.png'))),
//             ),
//             SizedBox(
//               height: 35,
//               width: 35,
//               child: GestureDetector(
//                   onTap: () => launchURL(3),
//                   child: Image(image: AssetImage('assets/github.png'))),
//             ),
//             SizedBox(
//               height: 35,
//               width: 35,
//               child: GestureDetector(
//                   onTap: () => launchURL(4),
//                   child: Image(image: AssetImage('assets/stack-overflow.png'))),
//             ),
//             SizedBox(
//               height: 20,
//               width: 10,
//             ),
//             SizedBox(
//               height: 20,
//               width: 10,
//             ),
//           ],
//         ),
//         SizedBox(
//           height: 20,
//         )
//       ],
//     ),
//   );
// }

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
