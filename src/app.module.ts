import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoModule } from './todo/todo.module';
import config from './config';

@Module({
  imports: [
    MongooseModule.forRoot(config.databaseurl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    ToDoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
