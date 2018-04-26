describe('Controller', () => {
  const Controller = require('../controllers/controller')
  let controller

  beforeEach( () => {
    controller = new Controller()
  })

  it('should return true if given user is present', () => {
    controller.arrUsers = ['Manolito', 'Maria', 'Pepito']
    expect(controller.userExists('Maria')).toEqual(true)
  })

  it('should suffle an array', () => {
    controller.arrUsers = ['Manolito', 'Maria', 'Pepito']
    controller.shuffleArray()
    expect(controller.arrUsers).not.toEqual(['Manolito', 'Maria', 'Pepito'])
  })

  it('should split an array depending on a group number and users per group', () => {
    controller.arrUsers = [1,2,3,4,5,6,7,8,9]
    const bigGroup = 1
    const usersPerGroup = 5
    controller.splitIntoGroups(bigGroup, usersPerGroup)
    expect(controller.arrGroups).toEqual([[1,2,3,4,5]])
  })

  it('should return smallest integer greater than or equal to a given number', () => {
    controller.numPersons = 10
    expect(controller.getGreaterInteger(3)).toEqual(4)
  })


})
