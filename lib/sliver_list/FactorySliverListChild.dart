import 'package:flutter/material.dart';

import 'experience.dart';

class FactorySliverListChild {
  final index;

  FactorySliverListChild(this.index);

  Widget getChild() {
    Widget ret = Container();
    switch (index) {
      case 0:
        ret = Experience();
        break;
      case 1:
        ret = Container(
          color: Colors.blue,
        );
        break;
      case 2:
        ret = Container(
          color: Colors.yellow,
        );
        break;
      default:
        ret = Container();
    }
    return ret;
  }
}
