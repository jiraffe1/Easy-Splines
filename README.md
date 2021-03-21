# Easy Splines
 A fun project were i have made a method of spline generation without all of the complex maths which a dumbo like me cannot understand
 
## How does it work?
 There are two principal parts to a track: a node, and a linepoint.
 Nodes act as a control point where the spline is defined, whereas the linepoints are generated as the actual curve to suit the nodes.
 
## Curves
 Essentially, the generator works by simulating the velocity of a dot travelling between the nodes.
 The point has a predefined rate of acceleration, top speed, and node tolerance.
 
 ### Acceleration
  The rate of acceleration is the rate at which the dot can add to its body in order to get closer and eventually reach the next node.
  
 ### Top Speed
  This is the cap on the velocity vector of the point, to make sure that the dot does not get stuck in loops of eternally "orbiting" its target or fly off into the distance
  
 ### Node tolerance
  This is a value representing the distance required to consider a point visited in the spline. If the dot comes within this proximity, its target is switched to the next node in the sequence
  
  This cycle of gradually accelerating towards the next point is repeated until the last point is visited. Hopefully by then we have a beautiful smooth curve
  
## Checklist
 * Make it so that the curve loops back to the first node for generation of racing tracks(that is what this project was initially meant for)
 * Add the ability to save the node data into a json file without having to write every single line point. As in: the spline will later be regenerated with the same properties(Acceleration, Top Speed, Node tolerance), where it can then have the linepoints added in again for whatever use is needed
 * Fix the line: There is this annoying bug where if I tried to draw lines between each linepoint it would generate these annoying lines which went back to the first node... so I just scrapped that and drew a circle for every linepoint. It seemed to work
