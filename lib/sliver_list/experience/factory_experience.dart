import 'package:flutter/material.dart';
import 'package:portfolio/sliver_list/education/behaviours.dart';

class FactoryExperience extends EducationBehaviour {
  final index;

  FactoryExperience(this.index);

  Widget getContents() {
    Widget ret = Container();
    switch (index) {
      case 0:
        ret = Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Senior Android Developer",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
            ),
            Text(
              "June 2021 - Present",
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
            ),
          ],
        );
        break;
      case 1:
        ret = columnContents("Game Developoper(Level Designer)",
            "February 2020 - March 2020", "");
        break;
      case 2:
        ret = Container(
          height: 10,
          color: Colors.yellow,
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
