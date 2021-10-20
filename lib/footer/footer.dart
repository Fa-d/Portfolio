import 'package:flutter/material.dart';
import 'package:portfolio/utils/consts_uils.dart';

class Footer extends StatelessWidget {
  const Footer({required Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            linksWidgets(),
            myContractsWidgets(),
            followMeOn(),
          ],
        ),
        SizedBox(height: 30),
        Center(
          child: Text("© Copyright 2021 Sadakat Hussain Fahad"),
        ),
      ],
    );
  }

  Expanded followMeOn() {
    return Expanded(
      flex: 1,
      child: Padding(
        padding: const EdgeInsets.only(left: 5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Follow me on",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
            ),
            SizedBox(height: 10),
            Wrap(
              children: [
                SizedBox(
                  height: 25,
                  width: 25,
                  child: GestureDetector(
                      onTap: () => launchURL(1),
                      child: Image(image: AssetImage('assets/linkedin.png'))),
                ),
                SizedBox(width: 5),
                SizedBox(
                  height: 25,
                  width: 25,
                  child: GestureDetector(
                      onTap: () => launchURL(2),
                      child: Image(image: AssetImage('assets/twitter.png'))),
                ),
                SizedBox(width: 5),
                SizedBox(
                  height: 25,
                  width: 25,
                  child: GestureDetector(
                      onTap: () => launchURL(3),
                      child: Image(image: AssetImage('assets/github.png'))),
                ),
                SizedBox(width: 5),
                SizedBox(
                  height: 25,
                  width: 25,
                  child: GestureDetector(
                      onTap: () => launchURL(4),
                      child: Image(
                          image: AssetImage('assets/stack-overflow.png'))),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Expanded myContractsWidgets() {
    return Expanded(
      flex: 1,
      child: Padding(
        padding: const EdgeInsets.only(right: 5.0, left: 5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "My Contracts",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
            ),
            SizedBox(height: 10),
            ListTile(
              leading: Icon(Icons.add_ic_call),
              title: Text(
                "+8801749948098",
                style: TextStyle(
                  fontSize: 12,
                ),
                overflow: TextOverflow.ellipsis,
              ),
            ),
            SizedBox(height: 2),
            ListTile(
              leading: Icon(Icons.mail),
              title: Text(
                "fsadakathussain@gmail.com",
                style: TextStyle(
                  fontSize: 12,
                ),
                overflow: TextOverflow.ellipsis,
              ),
            ),
            SizedBox(height: 2),
          ],
        ),
      ),
    );
  }

  Expanded linksWidgets() {
    return Expanded(
      flex: 1,
      child: Padding(
        padding: const EdgeInsets.only(right: 5.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Links",
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
            ),
            SizedBox(height: 10),
            Text(
              "Introduction",
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
            ),
            SizedBox(height: 2),
            Text(
              "Experience",
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
            ),
            SizedBox(height: 2),
            Text(
              "Education",
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
            ),
            SizedBox(height: 2),
            Text(
              "Projects",
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
            ),
          ],
        ),
      ),
    );
  }
}
