import 'package:flutter/material.dart';
import 'package:timelines/timelines.dart';

import 'factory_experience.dart';

class Experience extends StatelessWidget {
  const Experience({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            height: 20,
          ),
          Container(
            width: MediaQuery.of(context).size.width,
            color: Colors.blueGrey[100],
            child: Padding(
              padding: const EdgeInsets.all(5.0),
              child: Text(
                "Experiences",
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800),
              ),
            ),
          ),
          SizedBox(
            height: 20,
          ),
          FixedTimeline.tileBuilder(
            builder: TimelineTileBuilder.connectedFromStyle(
              contentsAlign: ContentsAlign.alternating,
              oppositeContentsBuilder: (context, index) => Padding(
                padding: const EdgeInsets.all(8.0),
                child: FactoryExperience(index).getOppositeContents(),
              ),
              contentsBuilder: (context, index) => Card(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: FactoryExperience(index).getContents(),
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
          // TabBar(
          //   indicator: BoxDecoration(
          //       borderRadius: BorderRadius.circular(50), // Creates border
          //       color: Colors.greenAccent), //Change background color from here
          //   tabs: [Tab(child: Text('Flight')),
          //     Tab(child: Text('Train')),
          //     Tab(child: Text('Car')),
          //     Tab(child: Text('Cycle')),
          //     Tab(child: Text('Boat')),],
          // )
        ],
      ),

    );
  }
}
