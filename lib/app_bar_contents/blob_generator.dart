// ignore: import_of_legacy_library_into_null_safe
import 'package:blobs/blobs.dart';
import 'package:flutter/material.dart';

class BlobGeneratorCus {
  double? size;
  List<Color> colors;

  BlobGeneratorCus({
    required this.size,
    required this.colors,
  });

  Blob som() {
    return Blob.animatedFromID(
      size: this.size,
      id: [
        '20-6-5774',
        '20-5-35',
        '20-5-7966',
        '20-5-841',
        '20-5-316610',
        '20-5-8402',
        '20-5-365'
      ],
      duration: Duration(seconds: 1),
      loop: true,
      styles: BlobStyles(
        strokeWidth: 50,
        gradient: RadialGradient(
          radius: .5,
          colors: this.colors,
        ).createShader(
          Rect.fromLTRB(0, 0, 300, 300),
        ),
      ),
    );
  }
}
