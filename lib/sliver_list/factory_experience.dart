import 'package:flutter/material.dart';



class FactoryExperience {
  final index;

  FactoryExperience(this.index);

  Widget getContents() {
    Widget ret = Container();
    switch (index) {
      case 0:
        ret = Column(
          children: [
            Text("SomeContent")
          ],
        );
        break;
      case 1:
        ret = Container(
          height: 10,
          color: Colors.blue,
        );
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
        ret = Column(
          children: [
            Text("SomeContent")
          ],
        );
        break;
      case 1:
        ret = Container(
          height: 10,
          color: Colors.blue,
        );
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
}
