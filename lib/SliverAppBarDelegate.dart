import 'dart:async';
import 'dart:math';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:simple_animations/simple_animations.dart';
import 'package:supercharged/supercharged.dart';

import 'consts_uils.dart';
import 'screens/small_screens.dart';

enum _ColorTween { color1, color2 }

class SliverAppBarDelegate extends SliverPersistentHeaderDelegate {
  Size _screenSize = const Size(0, 0);
  var oneSec = const Duration(milliseconds: 100);
  double changingBlobsPosition = 0;
  bool callingSetStateForBlobBool = false;

  SliverAppBarDelegate(Size size) {
    _screenSize = size;
  }

  double scrollAnimationValue(double shrinkOffset) {
    double maxScrollAllowed = maxExtent - minExtent;
    return ((maxScrollAllowed - shrinkOffset) / maxScrollAllowed)
        .clamp(0, 1)
        .toDouble();
  }

  void callingStateState(set) {
    callingSetStateForBlobBool = true;
    Timer.periodic(oneSec, (Timer timer) {
      set(() {
        if (changingBlobsPosition > _screenSize.width) {
          changingBlobsPosition = 0;
        } else {
          changingBlobsPosition += 1;
        }
      });
    });
  }

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    final double visibleMainHeight = max(maxExtent - shrinkOffset, minExtent);
    final double opacityOfWidget = scrollAnimationValue(shrinkOffset);

    return Container(
      height: visibleMainHeight,
      width: _screenSize.width,
      child: Stack(
        fit: StackFit.expand,
        children: <Widget>[
          minExtent == visibleMainHeight
              ? Container(color: Colors.white)
              : ColoredBackground(),
          Opacity(
            opacity: opacityOfWidget,
            child: StatefulBuilder(
              builder: (BuildContext context, StateSetter setState) {
                if (!callingSetStateForBlobBool) callingStateState(setState);
                return Stack(
                  children: getBlobs(changingBlobsPosition, _screenSize),
                );
              },
            ),
          ),
          profileIconWidget(
            _screenSize,
            visibleMainHeight,
            opacityOfWidget,
          ),
          profileNameDescWidget(_screenSize, opacityOfWidget),
          profileContractsWidgets(
            _screenSize,
            visibleMainHeight,
            opacityOfWidget,
          ),
        ],
      ),
    );
  }

  @override
  double get maxExtent => _screenSize.height * 0.90;

  @override
  double get minExtent => _screenSize.height * 0.10;

  @override
  bool shouldRebuild(SliverPersistentHeaderDelegate oldDelegate) {
    return true;
  }
}

class ColoredBackground extends StatelessWidget {
  const ColoredBackground({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MirrorAnimation<MultiTweenValues<_ColorTween>>(
      tween: MultiTween<_ColorTween>()
        ..add(
          _ColorTween.color1,
          Color(0x48ffd6d6).tweenTo(Color(0x8dfaf4d6)),
          1.seconds,
        )
        ..add(
          _ColorTween.color2,
          Color(0x8dfaf4d6).tweenTo(Color(0x81d7ffc8)),
          1.seconds,
        )
        ..add(
          _ColorTween.color2,
          Color(0x81d7ffc8).tweenTo(Color(0x81cdc4fc)),
          1.seconds,
        )
        ..add(
          _ColorTween.color2,
          Color(0x81cdc4fc).tweenTo(Color(0x81b4c8fc)),
          1.seconds,
        )
        ..add(
          _ColorTween.color2,
          Color(0x81b4c8fc).tweenTo(Color(0x81fcd1f9)),
          1.seconds,
        )
        ..add(
          _ColorTween.color2,
          Color(0x81fcd1f9).tweenTo(Color(0x81fdbdbd)),
          1.seconds,
        ),
      duration: tween1.duration,
      builder: (context, child, value) {
        return Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                value.get<Color>(_ColorTween.color1),
                value.get<Color>(_ColorTween.color2)
              ],
            ),
          ),
        );
      },
    );
  }
}

getBlobs(changingBlobsPosition, _screenSize) {
  return [
    AnimatedPositioned(
      curve: Curves.easeInExpo,
      top: (_screenSize.height * .01),
      right: changingBlobsPosition,
      duration: Duration(microseconds: 100),
      child: t1,
    ),
    AnimatedPositioned(
      curve: Curves.easeInExpo,
      top: 400,
      left: changingBlobsPosition,
      duration: Duration(microseconds: 100),
      child: t2,
    ),
    AnimatedPositioned(
      curve: Curves.easeInExpo,
      bottom: changingBlobsPosition,
      duration: Duration(microseconds: 100),
      child: t3,
    ),
    AnimatedPositioned(
      curve: Curves.easeInExpo,
      top: changingBlobsPosition,
      right: changingBlobsPosition,
      duration: Duration(microseconds: 100),
      child: t4,
    ),
    AnimatedPositioned(
      curve: Curves.easeInExpo,
      top: changingBlobsPosition,
      left: changingBlobsPosition,
      duration: Duration(microseconds: 100),
      child: t5,
    ),
    AnimatedPositioned(
      curve: Curves.easeInExpo,
      bottom: changingBlobsPosition,
      right: changingBlobsPosition,
      duration: Duration(microseconds: 100),
      child: t6,
    ),
  ];
}
