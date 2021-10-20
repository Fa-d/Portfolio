import 'package:flutter/material.dart';
import 'package:portfolio/utils/consts_uils.dart';

class Contracts extends StatelessWidget {
  var animationVal, size, visibleMainHeight;
  Contracts(this.animationVal,this.size, this.visibleMainHeight, {required Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return  Column(
      children: [
        Text(
          "Reach me through ...",
          textAlign: TextAlign.center,
          overflow: TextOverflow.clip,
          style: TextStyle(
              fontFamily: 'Courgette',
              fontSize: 23,
              color: Colors.black.withOpacity(animationVal),
              fontWeight: FontWeight.w800),
        ),
        SizedBox(height: size.height * .02),
        _socialContractWidgets(),
      ],
    );
  }
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
