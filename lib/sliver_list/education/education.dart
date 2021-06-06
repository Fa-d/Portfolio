import 'package:flutter/material.dart';
import 'package:portfolio/sliver_list/education/factory_education.dart';
import 'package:timelines/timelines.dart';



class Education extends StatelessWidget {
  const Education({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 20,
        ),
        Text(
          "Education",
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800),
        ),
        SizedBox(
          height: 20,
        ),
        FixedTimeline.tileBuilder(
          builder: TimelineTileBuilder.connectedFromStyle(
            contentsAlign: ContentsAlign.basic,
            oppositeContentsBuilder: (context, index) => Padding(
              padding: const EdgeInsets.all(8.0),
              child: FactoryEducation(index).getOppositeContents(),
            ),
            contentsBuilder: (context, index) => Card(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: FactoryEducation(index).getContents(),
              ),
            ),
            connectorStyleBuilder: (context, index) => ConnectorStyle.solidLine,
            indicatorStyleBuilder: (context, index) => IndicatorStyle.dot,
            itemCount: 3,
          ),
        ),
        SizedBox(
          height: 20,
        ),
      ],
    );
  }
}
