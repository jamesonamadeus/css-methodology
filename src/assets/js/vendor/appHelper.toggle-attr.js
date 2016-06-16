// toggle attribute value
function toggleState ( el, attrb, onState, offState ) {
  el.attr(attrb, el.attr(attrb) === offState ? onState : offState);
}


/*

  Example usage:

    toggleState( $self, 'aria-expanded', 'true', 'false' );

*/
