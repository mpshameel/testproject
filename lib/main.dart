import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/physics.dart';

/// Entrypoint of the application.
void main() {
  runApp(const MyApp());
}

/// [Widget] building the [MaterialApp].
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Dock(
            items: const [
              Icons.person,
              Icons.message,
              Icons.call,
              Icons.camera,
              Icons.photo,
            ],
            builder: (e) {
              return Container(
                constraints: const BoxConstraints(minWidth: 48),
                height: 48,
                margin: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  color: Colors.primaries[e.hashCode % Colors.primaries.length],
                ),
                child: Center(child: Icon(e, color: Colors.white)),
              );
            },
          ),
        ),
      ),
    );
  }
}

/// Dock of the reorderable [items].
class Dock<T extends Object> extends StatefulWidget {
  const Dock({
    super.key,
    this.items = const [],
    required this.builder,
  });

  /// Initial [T] items to put in this [Dock].
  final List<T> items;

  /// Builder building the provided [T] item.
  final Widget Function(T) builder;

  @override
  State<Dock<T>> createState() => _DockState<T>();
}

/// State of the [Dock] used to manipulate the [_items].
class _DockState<T extends Object> extends State<Dock<T>> {
  /// [T] items being manipulated.
  late final List<T> _items = widget.items.toList();
  int? _hoverIndex;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        color: Colors.black26,
      ),
      padding: const EdgeInsets.all(8),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: _items.asMap().entries.map((entry) {
          final index = entry.key;
          final item = entry.value;

          return _AnimatedDockItem<T>(
            item: item,
            index: index,
            hoverIndex: _hoverIndex,
            onHover: (hoveredIndex) {
              setState(() {
                _hoverIndex = hoveredIndex;
              });
            },
            onReorder: (data) {
              setState(() {
                final fromIndex = _items.indexOf(data);
                _items.removeAt(fromIndex);
                _items.insert(index, data);
              });
            },
            builder: widget.builder,
          );
        }).toList(),
      ),
    );
  }
}

class _AnimatedDockItem<T extends Object> extends StatefulWidget {
  const _AnimatedDockItem(
      {required this.item,
      required this.index,
      required this.hoverIndex,
      required this.onHover,
      required this.builder,
      required this.onReorder});

  final T item;
  final int index;
  final int? hoverIndex;
  final ValueChanged<int?> onHover;
  final Widget Function(T) builder;
  final ValueChanged<T> onReorder;

  @override
  State<_AnimatedDockItem<T>> createState() => _AnimatedDockItemState<T>();
}

class _AnimatedDockItemState<T extends Object>
    extends State<_AnimatedDockItem<T>> with SingleTickerProviderStateMixin {
  late AnimationController _hoverController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _hoverController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 1.5).animate(
      CurvedAnimation(parent: _hoverController, curve: Curves.easeOut),
    );
  }

  @override
  void dispose() {
    _hoverController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final distance = widget.hoverIndex == null
        ? 0
        : (widget.index - widget.hoverIndex!).abs();
    final scaleFactor = max(1.0, 1.5 - (distance * 0.2));
    return DragTarget<T>(
      onWillAccept: (data) => true,
      onAccept: widget.onReorder,
      builder: (context, candidateData, rejectedData) {
        return MouseRegion(
          onEnter: (_) {
            widget.onHover(widget.index);
            _hoverController.forward();
          },
          onExit: (_) {
            widget.onHover(null);
            _hoverController.reverse();
          },
          child: GestureDetector(
            child: ScaleTransition(
              scale: _scaleAnimation,
              child: Draggable<T>(
                data: widget.item,
                feedback: Material(
                  color: Colors.transparent,
                  child: widget.builder(widget.item),
                ),
                childWhenDragging: Opacity(
                  opacity: 0.5,
                  child: widget.builder(widget.item),
                ),
                child: widget.builder(widget.item),
              ),
            ),
          ),
          // child: GestureDetector(
          //   child: ScaleTransition(
          //     scale: _scaleAnimation,
          //     child: Draggable<T>(
          //       data: widget.item,
          //       feedback: Material(
          //         color: Colors.transparent,
          //         child: widget.builder(widget.item),
          //       ),
          //       childWhenDragging: Opacity(
          //         opacity: 0.5,
          //         child: widget.builder(widget.item),
          //       ),
          //       child: widget.builder(widget.item),
          //     ),
          //   ),
          // ),
        );
      },
    );
  }
}
