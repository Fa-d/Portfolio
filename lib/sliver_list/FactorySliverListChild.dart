import 'package:flutter/material.dart';
import 'package:portfolio/sliver_list/my_desc.dart';

import 'education/education.dart';
import 'experience/experience.dart';

class FactorySliverListChild {
  final index;

  FactorySliverListChild(this.index);

  Widget getChild() {
    Widget ret = Container();
    switch (index) {
      case 1:
        ret = Education(key: GlobalKey(),);
        break;
      case 2:
        ret = Experience(
          key: GlobalKey(),
        );
        break;
      case 0:
        ret = MyDescription(
          key: GlobalKey(),
        );
        break;
      default:
        ret = Container();
    }
    return ret;
  }
}
