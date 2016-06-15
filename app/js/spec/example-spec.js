describe('Example', function() {
  var paragraph;

  beforeEach(function(){
    setupDOM();
  });

  afterEach(function() {
    resetDOM();
  });

  it('works', function() {
    (new Example()).hello();
    expect(document.getElementById('example').textContent).toContain('Hello world');
  });

  function setupDOM() {
    paragraph = document.createElement('p');
    paragraph.id = 'example';
    document.body.appendChild(paragraph);
  }

  function resetDOM() {
    paragraph.remove();
  }
});
