import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { ToDoModule } from './todo/todo.module';

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
