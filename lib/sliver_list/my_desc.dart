import 'package:flutter/material.dart';
import 'package:portfolio/sliver_list/education/education.dart';
import 'package:portfolio/sliver_list/experience/experience.dart';

class MyDescription extends StatelessWidget {
  const MyDescription({required Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: MediaQuery.of(context).size.width,
            color: Colors.blueGrey[100],
            child: Padding(
              padding: const EdgeInsets.all(5.0),
              child: Text(
                "About Me",
                textDirection: TextDirection.ltr,
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // SizedBox(
              //   width: 2,
              // ),
              Flexible(
                flex: 10,
                child: Text(
                    '''I am a passionate mobile developer. Always up for solving problems, aiming towards making great apps, pixel perfect, utilizing the performance. 
            I believe in smallest possible outcomes. It leads to great success.'''),
              ),
              Flexible(
                  flex: 1,
                  child: Image.asset(
                    'assets/resume.png',
                    height: 80.0,
                    fit: BoxFit.fill,
                  )),
              // SizedBox(
              //   width: 2,
              // ),
            ],
          ),
          // Row(
          //   children: [
          //     Flexible(child: Education(), flex: 1),
          //     Flexible(child: Experience(), flex: 1)
          //   ],
          // ),
        ],
      ),
    );
  }
}
