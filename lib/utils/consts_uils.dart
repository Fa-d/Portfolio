import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../app_bar_contents/blob_generator.dart';

const Map<int, String> urls = {
  0: "mailto:fsadakathussain@gmail.com ",
  1: "https://www.linkedin.com/in/sadakat-hussain-fahad/",
  2: "https://twitter.com/faddy_fahad__",
  3: "https://github.com/Fa-d",
  4: "https://stackoverflow.com/users/12046379/sadakat-hussain-fahad"
};

void launchURL(i) async => await canLaunch(urls.values.elementAt(i))
    ? await launch(urls.values.elementAt(i))
    : throw 'Could not launch ${urls.values.elementAt(i)}';

enum _ColorTween { color1, color2 }
/*
MultiTween tween1 = MultiTween<_ColorTween>()
  ..add(
    _ColorTween.color1,
    Tween(begin: Color(0x48ffd6d6), end: Color(0x8dfaf4d6)),
  )
  ..add(
    _ColorTween.color2,
    Tween(begin: Color(0x8dfaf4d6), end: Color(0x81d7ffc8)),
  )
  ..add(
    _ColorTween.color2,
    Tween(begin: Color(0x81d7ffc8), end: Color(0x81cdc4fc)),
  )
  ..add(
    _ColorTween.color2,
    Tween(begin: Color(0x81cdc4fc), end: Color(0x81b4c8fc)),
  )
  ..add(
    _ColorTween.color2,
    Tween(begin: Color(0x81b4c8fc), end: Color(0x81fcd1f9)),
  )
  ..add(
    _ColorTween.color2,
    Tween(begin: Color(0x81fcd1f9), end: Color(0x81fdbdbd)),
  );*/

var t1 = BlobGeneratorCus(
  size: 180,
  colors: [
    Color(0xff0048ff).withOpacity(.2),
    Color(0xffff0000).withOpacity(.2),
  ],
).som();

var t2 = BlobGeneratorCus(
  size: 250,
  colors: [
    Color(0xffff006f).withOpacity(.2),
    Color(0xff8000ff).withOpacity(.2),
  ],
).som();

var t3 = BlobGeneratorCus(
  size: 100,
  colors: [
    Color(0xffff0000).withOpacity(.2),
    Color(0xffffd500).withOpacity(.2),
  ],
).som();
var t4 = BlobGeneratorCus(
  size: 50,
  colors: [
    Color(0xffffc800).withOpacity(.2),
    Color(0xffd900ff).withOpacity(.2),
  ],
).som();
var t5 = BlobGeneratorCus(
  size: 200,
  colors: [
    Color(0xffff8c00).withOpacity(.2),
    Color(0xff00d9ff).withOpacity(.2),
  ],
).som();
var t6 = BlobGeneratorCus(
  size: 150,
  colors: [
    Color(0xffff00a1).withOpacity(.2),
    Color(0xff002aff).withOpacity(.2),
  ],
).som();
