import 'package:flutter/material.dart';

import 'education/education.dart';
import 'experience/experience.dart';

class FactorySliverListChild {
  final index;

  FactorySliverListChild(this.index);

  Widget getChild() {
    Widget ret = Container();
    switch (index) {
      case 0:
        ret = Education();
        break;
      case 1:
        ret = Experience();
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
