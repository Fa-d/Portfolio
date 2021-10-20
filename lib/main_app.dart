import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

import 'app_bar_contents/appbar_deleget.dart';
import 'app_bar_contents/appbar_drawer.dart';
import 'footer/footer.dart';
import 'sliver_list/FactorySliverListChild.dart';

class MainApp extends StatefulWidget {
  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: AppBarDrawer(
        key: GlobalKey(),
      ),
      body: CustomScrollView(
        slivers: <Widget>[
          SliverPersistentHeader(
            pinned: true,
            delegate: SliverAppBarDelegate(MediaQuery.of(context).size),
          ),
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) => Padding(
                padding: const EdgeInsets.only(bottom: 5),
                child: FactorySliverListChild(index).getChild(),
              ),
              childCount: 3,
            ),
          ),
          SliverFillRemaining(
            hasScrollBody: false,
            child: Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                color: Color(Colors.blueGrey.value),
                child: Padding(
                  padding: EdgeInsets.all(20),
                  child: Footer(
                    key: GlobalKey(),
                  ),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
