import {PrismaClient} from '@prisma/client'


const prisma = new  PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data:{
           name: 'John Doe',
           email: 'john@doe.com',
           avatarUrl: 'https://avatars.githubusercontent.com/u/36646169?v=4',

        }
    })

    const pool = await prisma.pool.create({
        data:{
            title: 'Bolão exemplo',
            code: 'BOL123',
            ownerId: user.id,
            
            participants:{
                create:{
                    userId: user.id,
                }
            }

        }
    })

    await prisma.game.create({
        data:{
            date: '2022-12-01T20:47:24.979Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
          date: '2022-11-03T12:00:00.201Z',
          firstTeamCountryCode: 'BR',
          secondTeamCountryCode: 'AR',
    
          guesses: {
            create: {
              firstTeamPoints: 2,
              secondTeamPoints: 1,
    
              participant: {
                connect: {
                  userId_poolId: {
                    userId: user.id,
                    poolId: pool.id,
                  }
                }
              }
            }
          }
        },
      })

}

main()