import 'package:flutter/material.dart';
import 'package:portfolio/sliver_list/education/behaviours.dart';

class FactoryExperience extends EducationBehaviour {
  final index;

  FactoryExperience(this.index);

  Widget getContents() {
    Widget ret = Container();
    switch (index) {
      case 0:
        ret = columnContents(
          "Senior Android Developer)",
          "June 2021 - Present",
          "",
        );
        break;
      case 1:
        ret = columnContents(
          "Game Developer(Level Designer)",
          "February 2020 - March 2020",
          "",
        );
        break;
      case 2:
        ret = columnContents(
          "Web Developer",
          "October 2019 - November 2019",
          "",
        );
        break;
      default:
        ret = Container();
    }
    return ret;
  }

  Widget getOppositeContents() {
    Widget ret = Container();
    switch (index) {
      case 0:
        ret = Text(
          "Lab AR",
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
        );
        break;
      case 1:
        ret = Text(
          "Lab AR",
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
        );
        break;
      case 2:
        ret = Text(
          "I2Technologies",
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
        );
        break;
      default:
        ret = Container();
    }
    return ret;
  }
}
