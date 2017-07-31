import { HhRentPage } from './app.po';

describe('hh-rent App', () => {
  let page: HhRentPage;

  beforeEach(() => {
    page = new HhRentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
