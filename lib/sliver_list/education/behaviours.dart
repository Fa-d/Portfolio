import 'package:flutter/material.dart';

class EducationBehaviour {
  columnContents(a, b, c) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(height: 10),
        Text(
          a,
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800),
        ),
        SizedBox(height: 10),
        Text(
          b,
          style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600),
        ),
        SizedBox(height: 10),
        Text(
          c,
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
        ),
        SizedBox(height: 10),
      ],
    );
  }
}
