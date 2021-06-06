import 'package:flutter/material.dart';
import 'package:portfolio/sliver_list/education/behaviours.dart';

class FactoryEducation extends EducationBehaviour {
  final index;

  FactoryEducation(this.index);

  Widget getContents() {
    Widget ret = Container();
    switch (index) {
      case 0:
        ret = columnContents(
            "Bangladesh Army University of Engineering and Technology",
            "Bachelor of Science in Computer Science and Engineering (2017-2021)",
            "CGPA: 3.20");
        break;
      case 1:
        ret = columnContents(
            "BIAM Model School and College", "Science", "GPA: 4.83");
        break;
      case 2:
        ret = columnContents(
            "BIAM Model School and College", "Science", "GPA: 5");
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
        ret = Column(
          children: [
            SizedBox(
              height: 20,
            ),
            Text(
              "B. Sc.",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
            ),
          ],
        );
        break;
      case 1:
        ret = Column(
          children: [
            SizedBox(
              height: 20,
            ),
            Text(
              "HSC",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
            ),
          ],
        );
        break;
      case 2:
        ret = Column(
          children: [
            SizedBox(
              height: 20,
            ),
            Text(
              "SSC",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
            ),
          ],
        );
        break;
      default:
        ret = Container();
    }
    return ret;
  }
}
