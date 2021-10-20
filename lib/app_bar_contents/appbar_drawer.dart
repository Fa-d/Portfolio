import 'package:flutter/material.dart';
import 'package:portfolio/utils/consts_uils.dart';

class AppBarDrawer extends StatelessWidget {
  const AppBarDrawer({
    required Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          Expanded(
            flex: 1,
            child: Container(
              width: MediaQuery.of(context).size.width * 0.85,
              child: DrawerHeader(
                decoration: BoxDecoration(
                    image: DecorationImage(
                        image: AssetImage("assets/my.jpg"), fit: BoxFit.cover)),
                child: Text("Mee"),
              ),
            ),
          ),
          Expanded(
            flex: 2,
            child: ListView(children: [
              ListTile(
                leading: Image(height: 25, width: 25,image: AssetImage('assets/gmail.png')),
                title: Text("Mail"),
                onTap: () {
                  launchURL(0);
                  Navigator.of(context).pop();
                },
              ),
              ListTile(
                leading: Image(height: 25, width: 25,image: AssetImage('assets/linkedin.png')),
                title: Text("LinknedIn"),
                onTap: () {
                  launchURL(1);
                  Navigator.of(context).pop();
                },
              ),
              ListTile(
                leading: Image(height: 25, width: 25,image: AssetImage('assets/twitter.png')),
                title: Text("Twitter"),
                onTap: () {
                  launchURL(2);
                  Navigator.of(context).pop();
                },
              ),
              ListTile(
                leading: Image(height: 25, width: 25,image: AssetImage('assets/github.png')),
                title: Text("Github"),
                onTap: () {
                  launchURL(3);
                  Navigator.of(context).pop();
                },
              ),
              ListTile(
                leading: Image(height: 25, width: 25,image: AssetImage('assets/stack-overflow.png')),
                title: Text("StackOverflow"),
                onTap: () {
                  launchURL(4);
                  Navigator.of(context).pop();
                },
              ),
            ]),
          )
        ],
      ),
    );
  }
}
