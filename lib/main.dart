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

  final List<T> items;
  final Widget Function(T) builder;

  @override
  State<Dock<T>> createState() => _DockState<T>();
}

class _DockState<T extends Object> extends State<Dock<T>> {
  late final List<T> _items = widget.items.toList();
  int? _hoverIndex;
  T? _draggedItem;

  @override
  Widget build(BuildContext context) {
    return DragTarget<T>(
        onWillAccept: (data) => true,
        onAccept: (data) {
          setState(() {
            if (!_items.contains(data)) {
              _items.add(data); // Add the item back to the list if it's missing
            }
          });
        },
        onLeave: (data) {
          if (_draggedItem != null) {
            setState(() {
              _items.remove(_draggedItem); // Remove the dragged item
            });
          }
        },
        builder: (context, candidateData, rejectedData) {
          return Container(
            width: 360,
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.black26,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: _items.asMap().entries.map((entry) {
                final index = entry.key;
                final item = entry.value;

                return DragTarget<T>(
                    onWillAccept: (data) => true,
                    onAccept: (data) {
                      setState(() {
                        final fromIndex =
                            _items.indexOf(data); // Get original index
                        if (fromIndex != index) {
                          _items.removeAt(fromIndex); // Remove the dragged item
                          _items.insert(
                              index, data); // Insert it at the new position
                        }
                      });
                    },
                    builder: (context, candidateData, rejectedData) {
                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        transform: Matrix4.identity()
                          ..scale(_getScale(index)) // Scale for pyramid effect
                          ..translate(
                              0.0,
                              _getTranslation(
                                  index)), // Move hovered icon upward
                        margin: EdgeInsets.symmetric(
                            horizontal: _getSpacing(index)), // Adjust spacing
                        child: MouseRegion(
                          onEnter: (_) => setState(() => _hoverIndex = index),
                          onExit: (_) => setState(() => _hoverIndex = null),
                          child: Draggable<T>(
                            data: item,
                            feedback: Material(
                              color: Colors.transparent,
                              child: Transform.scale(
                                scale: 1.1,
                                child: widget.builder(item),
                              ),
                            ),
                            childWhenDragging: Opacity(
                              opacity: 0.5,
                              child: widget.builder(item),
                            ),
                            onDragStarted: () {
                              _draggedItem = item; // Track the dragged item
                            },
                            onDragEnd: (details) {
                              if (details.wasAccepted == false &&
                                  !_items.contains(_draggedItem)) {
                                setState(() {
                                  _items.add(
                                      _draggedItem!); // Re-add the item if needed
                                  _draggedItem = null;
                                });
                              }
                            },
                            child: widget.builder(item),
                          ),
                        ),
                      );
                    });
              }).toList(),
            ),
          );
        });
  }

  /// Get scale factor for each icon
  double _getScale(int index) {
    if (_hoverIndex == null) return 1.0;
    final distance = (index - _hoverIndex!).abs();
    return 1.1 - (0.05 * distance.clamp(0, 2)); // Adjust these values
  }

  /// Get vertical translation for hovered icon
  double _getTranslation(int index) {
    if (_hoverIndex == null) return 0.0;
    return _hoverIndex == index
        ? -15.0
        : -5.0 * (2 - (index - _hoverIndex!).abs().clamp(0, 2));
  }

  /// Adjust spacing between icons
  double _getSpacing(int index) {
    if (_hoverIndex == null) return 2.0; // Minimal default spacing
    final distance = (index - _hoverIndex!).abs();
    return 4.0 - (1.5 * distance.clamp(0, 2)); // Minimal hover spacing
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
  late Animation<double> _shadowAnimation;

  @override
  void initState() {
    super.initState();
    _hoverController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.2, end: 1.0).animate(
      CurvedAnimation(parent: _hoverController, curve: Curves.easeOut),
    );

    // _shadowAnimation = Tween<double>(begin: 1.0, end: 4.0).animate(
    //   CurvedAnimation(parent: _hoverController, curve: Curves.easeInOut),
    // );
  }

  @override
  void dispose() {
    _hoverController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // print("-----------------------vv" + widget.hoverIndex.toString());
    final distance = widget.hoverIndex == null
        ? 0
        : (widget.index - widget.hoverIndex!).abs();
    final scaleFactor = max(1.0, 1.4 - (distance * 0.2));
    final noScale = 1.0;
    final iconSize = 48.0;

    final maxDistance = max(widget.index, widget.hoverIndex ?? 0);

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
              child: AnimatedBuilder(
                  animation: _hoverController,
                  builder: (context, child) {
                    return Transform.scale(
                      scale: widget.hoverIndex == null ? noScale : scaleFactor,
                      child: Material(
                        color: Colors.transparent,
                        // elevation: _shadowAnimation.value,
                        borderRadius: BorderRadius.circular(8),
                        child: Draggable<T>(
                          data: widget.item,
                          feedback: Material(
                            color: Colors.transparent,
                            child: widget.builder(widget.item),
                          ),
                          childWhenDragging: Opacity(
                            opacity: 0.1,
                            child: widget.builder(widget.item),
                          ),
                          child: widget.builder(widget.item),
                        ),
                      ),
                    );
                  })),
          // GestureDetector(
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
