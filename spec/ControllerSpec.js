describe('Controller', () => {
  const Controller = require('../controllers/controller')
  let controller

  beforeEach( () => {
    controller = new Controller()
  })

  it('should return true if given user is present', () => {
    controller.arrUsers = ['Daredevil', 'Elektra', 'Punisher']
    expect(controller.userExists('Elektra')).toBe(true)
  })

  it('should shuffle an array', () => {
    controller.arrUsers = ['Daredevil', 'Elektra', 'Punisher', 'Kingpin']
    controller.shuffleArray()
    expect(controller.arrUsers).not.toEqual(['Daredevil', 'Elektra', 'Punisher', 'Kingpin'])
  })

  it('should split an array depending on a group number and users per group', () => {
    controller.arrUsers = [1,2,3,4,5,6,7,8,9]
    const bigGroup = 1
    const usersPerGroup = 5
    controller.splitIntoGroups(bigGroup, usersPerGroup)
    expect(controller.arrGroups).toEqual([[1,2,3,4,5]])
  })

  it('should return smallest integer greater than or equal to a given number', () => {
    controller.numUsers = 10
    expect(controller.getGreaterInteger(3)).toEqual(4)
  })

  it('should get the first element of each element of an array', () => {
    controller.arrGroups = [[5, 9, 2, 3, 4], [3, 4, 6, 1, 3]]
    controller.getLeaders()
    expect(controller.arrLeaders).toEqual([5, 3])
  })

  it('should change the element of an array if it exists into an other array by the next one', () => {
    controller.arrLeaders = [3, 6, 9]
    controller.arrGroups = [[3, 4, 5], [6, 2, 7], [9, 8, 1]]
    const arrPreviousLeaders = [3, 6, 7]
    controller.checkRepeatedLeaders(arrPreviousLeaders)
    expect(controller.arrLeaders).toEqual([4, 2, 9])
  })

  it('should reset variables', () => {
    controller.numUsers = 9
    controller.arrUsers = [1, 2, 3]
    controller.arrGroups = [4, 5, 6]
    controller.resetStatus()
    expect(controller.numUsers).toEqual(0)
    expect(controller.arrUsers).toEqual([])
    expect(controller.arrGroups).toEqual([])
  })

})
