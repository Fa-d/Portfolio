import 'package:flutter/material.dart';

import 'SliverAppBarDelegate.dart';

class MainApp extends StatefulWidget {
  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: <Widget>[
          SliverPersistentHeader(
            pinned: true,
            delegate: SliverAppBarDelegate(MediaQuery.of(context).size),
          ),
          SliverFillRemaining(
            child: SingleChildScrollView(
              child: Column(
                children: <Widget>[
                  const Text('Text'),
                  Container(
                    color: Colors.redAccent,
                    height: 400,
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
